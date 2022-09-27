import React from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {
  Ad,
  ArrowBigLeft,
  Link,
  Report,
  ReportSearch,
} from "tabler-icons-react";
import Placeholder from "react-bootstrap/Placeholder";
import { QUERY_KEYWORD_REPORTS } from "../../shared/query_cache_key";
import SearchAPI from "../../api/search";
import { numberWithCommas } from "../../utils/number";
import "./ReportDetail.scss";
import { INDEX_ROUTE } from "../../shared/routes";

const ReportDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id: reportId } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery(
    [QUERY_KEYWORD_REPORTS, reportId],
    ({ queryKey }) => SearchAPI.getReportDetail(queryKey[1] ?? ""),
    {
      enabled: reportId != null,
    }
  );

  if (!reportId) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="report-detail">
        <Card>
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
              <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
              <Placeholder xs={8} />
            </Placeholder>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <Container className="report-detail">
      <ArrowBigLeft
        className="back-icon"
        size={32}
        onClick={() => navigate(INDEX_ROUTE)}
      />

      <span className="meta my-4">
        <span className="meta-body">
          <span className="meta-content text-primary fs-2">
            {data?.keyword}
          </span>
        </span>
      </span>

      <Row className="gy-3 mb-4">
        <Col lg={6} md={12} sm={12} xs={12}>
          <span className="meta">
            <span className="meta-img bg-secondary border-secondary text-white">
              <ReportSearch size={40} />
            </span>
            <span className="meta-body">
              <span className="meta-content">Total results found</span>
              <span className="meta-desc">
                {numberWithCommas(data?.totalResults ?? 0)}
              </span>
            </span>
          </span>
        </Col>

        <Col lg={6} md={12} sm={12} xs={12}>
          <span className="meta">
            <span className="meta-img bg-warning border-warning text-dark">
              <Report size={40} />
            </span>
            <span className="meta-body">
              <span className="meta-content">In second(s)</span>
              <span className="meta-desc">{data?.totalSeconds}(s)</span>
            </span>
          </span>
        </Col>

        <Col lg={6} md={12} sm={12} xs={12}>
          <span className="meta">
            <span className="meta-img bg-success border-success text-white">
              <Ad size={40} />
            </span>
            <span className="meta-body">
              <span className="meta-content">Ad(s)</span>
              <span className="meta-desc">
                {numberWithCommas(data?.totalAdwords ?? 0)}
              </span>
            </span>
          </span>
        </Col>

        <Col lg={6} md={12} sm={12} xs={12}>
          <span className="meta">
            <span className="meta-img bg-danger border-danger text-white">
              <Link size={40} />
            </span>
            <span className="meta-body">
              <span className="meta-content"># of links</span>
              <span className="meta-desc">{data?.links?.length ?? "-"}</span>
            </span>
          </span>
        </Col>
      </Row>

      <Card className="html-card">
        <Card.Body className="p-4">
          {data?.html && (
            <div
              className="html-view"
              dangerouslySetInnerHTML={{
                __html: data?.html,
              }}
            />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReportDetail;
