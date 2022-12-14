import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Toaster from "../../lib/toast";
import AuthAPI from "../../api/auth";
import AuthContext from "../../context/auth";
import "./SignUp.scss";
import { INDEX_ROUTE, LOGIN_ROUTE } from "../../shared/routes";

interface SignUpForm {
  email: string;
  password: string;
  confirm: string;
}

const SignUpFormSchema = z
  .object({
    email: z.string().email("Invalid e-mail address"),
    password: z
      .string()
      .regex(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "Password must be 6 or more characters long, contains at leat one uppercase letter, one digit and one special character."
      ),
    confirm: z
      .string()
      .regex(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "Password must be 6 or more characters long, contains at leat one uppercase letter, one digit and one special character."
      ),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    formState: { errors, isValid, isDirty, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<SignUpForm>({
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
    resolver: zodResolver(SignUpFormSchema),
  });

  const { setIsAuthenicated } = AuthContext.useAuthContext();

  const onSubmit = async (data: SignUpForm) => {
    try {
      await AuthAPI.signup(data.email, data.password);
      setIsAuthenicated(true);
      navigate(location?.state?.from?.pathname ?? INDEX_ROUTE, {
        replace: true,
      });
      reset();
      Toaster.success("Sign up successfully");
    } catch (error) {
      Toaster.error("Sign up failed!");
    }
  };

  return (
    <div className="sign-up-page bg-primary">
      <Card className="sign-up-form-card shadow-sm">
        <Card.Body>
          <Card.Title>
            <h2>Sign up & join us!</h2>
          </Card.Title>
          <Form
            method="POST"
            noValidate
            validated={isValid}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email address</Form.Label>
              <Form.Control placeholder="Enter email" {...register("email")} />
              <Form.Control.Feedback className="d-block" type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password again"
                {...register("confirm")}
              />
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.confirm?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 sign-up-form-card__link">
              already have an account? so&nbsp;
              <Link to={LOGIN_ROUTE}>Sign in</Link>
            </Form.Group>
            <div className="d-grid">
              <Button
                variant="secondary"
                type="submit"
                disabled={!isDirty || isSubmitting}
              >
                Sign up
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUp;
