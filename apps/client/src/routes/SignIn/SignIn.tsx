import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import "./SignIn.scss";

interface SignInForm {
  email: string;
  password: string;
}

const SignInFormSchema = z.object({
  email: z.string().email("Invalid e-mail address"),
  password: z
    .string()
    .regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "Password must be 6 or more characters long, contains at leat one uppercase letter, one digit and one special character."
    ),
});

const SignIn: React.FC = () => {
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignInForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInFormSchema),
  });

  const email = watch("email");

  const onSubmit = (data: SignInForm) => {
    console.log("data:", data);
  };

  return (
    <div className="sign-in-page bg-secondary">
      <Card className="sign-in-form-card shadow-sm">
        <Card.Body>
          <Card.Title>
            <h2>Sign in here</h2>
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
              {!errors.email && (
                <Form.Text className="text-muted">
                  We&apos;ll never share your email with anyone else.
                </Form.Text>
              )}
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
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit">
                {!email ? "Hmmm, let's see..." : `Yes, i'm ${email}`}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignIn;
