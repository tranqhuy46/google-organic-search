import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Placeholder from "react-bootstrap/Placeholder";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import Offcanvas from "react-bootstrap/Offcanvas";
import Alert from "react-bootstrap/Alert";
import {
  Search,
  CloudUpload,
  HourglassEmpty,
  FileImport,
  Clock,
  Database,
  Eye,
  Ad,
  Link,
  AppWindow,
} from "tabler-icons-react";
import { IKeywordReport } from "ui/shared/type";
import SearchAPI from "../../api/search";
import "./Home.scss";
import { QUERY_KEYWORD_REPORTS } from "../../shared/query_cache_key";
import { numberWithCommas } from "../../utils/number";

interface IKeywordReportTableProps {
  isLoading: boolean;
  data: IKeywordReport[];
}

function SkeletonTableRow() {
  return (
    <Placeholder
      className="keyword-table__loading-col"
      as="tr"
      animation="glow"
    >
      <Placeholder as="td" animation="glow">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="td" animation="glow">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="td" animation="glow">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="td" animation="glow">
        <Placeholder xs={12} />
      </Placeholder>
    </Placeholder>
  );
}

function EmptyTableRow() {
  return (
    <tr>
      <td colSpan={4}>
        <div className="keyword-table__empty-col">
          <HourglassEmpty size={56} color="lightgray" />
          <div className="keyword-table__empty-col__text text-center fs-5">
            No data
          </div>
        </div>
      </td>
    </tr>
  );
}

interface ReportRowProps {
  item: IKeywordReport;
  onViewClick(item: IKeywordReport): void;
}

const ReportRow: React.FC<ReportRowProps> = (props) => {
  const { item, onViewClick } = props;

  return (
    <tr key={item.id} className="keyword-table__row">
      <td>
        <Eye
          className="keyword-table-action-icon"
          onClick={() => onViewClick(item)}
        />
      </td>
      <td>
        <Badge className="keyword-table-chip" bg="secondary" pill>
          {item.keyword}
        </Badge>
      </td>
      <td>
        <Badge
          className="keyword-table-chip keyword-table-chip--stat"
          bg="primary"
          text="white"
        >
          <span>{numberWithCommas(item.totalResults ?? 0)}</span>
          <Database size={16} />
        </Badge>
        <Badge
          className="keyword-table-chip keyword-table-chip--stat"
          bg="success"
          text="white"
        >
          <span>{item.totalSeconds}s</span>
          <Clock size={16} />
        </Badge>
        <Badge
          className="keyword-table-chip keyword-table-chip--stat"
          bg="warning"
          text="dark"
        >
          <span>{item.totalAdwords}</span>
          <Ad size={16} />
        </Badge>
      </td>
      <td>
        <Badge className="keyword-table-chip keyword-table-chip--outlined">
          {item.status}
        </Badge>
      </td>
    </tr>
  );
};

interface ReportOffcanvasProps {
  isOpen: boolean;
  item?: IKeywordReport | null;
  onClose(): void;
}

const ReportOffcanvas: React.FC<ReportOffcanvasProps> = (props) => {
  const { item, isOpen, onClose } = props;
  const { data, isLoading } = useQuery(
    [QUERY_KEYWORD_REPORTS, item?.id],
    ({ queryKey }) => SearchAPI.getReportDetail(queryKey[1] ?? ""),
    {
      enabled: item?.id != null,
    }
  );

  return (
    <Offcanvas show={isOpen} onHide={onClose} className="keyword-offcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <div className="keyword-offcanvas__title">
            <span className="fs-5">Keyword</span>
            <Badge bg="secondary">{data?.keyword}</Badge>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {isLoading ? (
          <span className="text-left fs-5">Loading...</span>
        ) : (
          <Stack gap={4}>
            <div className="label">
              <Link size={24} />
              Total links:&nbsp;
              <Badge>{data?.links?.length ?? "-"}</Badge>
            </div>
            <div className="label">
              <Database size={24} />
              <span>
                {numberWithCommas(data?.totalResults ?? 0) ?? "-"}
                &nbsp;results&nbsp;
              </span>
              &nbsp;
              <span>in</span>
              &nbsp;
              <span>{data?.totalSeconds ?? "-"}(s)</span>
            </div>

            <div>
              <div className="label">
                <AppWindow size={24} />
                HTML snapshot
              </div>
              <div className="html-view">
                {data?.html && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: data?.html,
                    }}
                  />
                )}
                <div className="mask" />
              </div>
            </div>
          </Stack>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

const KeywordReportTable: React.FC<IKeywordReportTableProps> = (props) => {
  const { isLoading, data } = props;
  const [showedReport, setShowedReport] = React.useState<IKeywordReport | null>(
    null
  );

  const handleClose = () => setShowedReport(null);
  const handleShow = (_report: IKeywordReport) => setShowedReport(_report);

  return (
    <>
      <Table hover={data?.length !== 0}>
        <thead>
          <tr>
            <th className="keyword-table__functional-col" />
            <th>Keyword</th>
            <th>Stat(s)</th>
            <th className="keyword-table__functional-col">Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <>
              <SkeletonTableRow />
              <SkeletonTableRow />
              <SkeletonTableRow />
              <SkeletonTableRow />
              <SkeletonTableRow />
            </>
          ) : data?.length ? (
            data?.map((row) => (
              <ReportRow key={row.id} item={row} onViewClick={handleShow} />
            ))
          ) : (
            <EmptyTableRow />
          )}
        </tbody>
      </Table>

      {/* DETAIL VIEW */}
      <ReportOffcanvas
        isOpen={Boolean(showedReport?.id)}
        item={showedReport}
        onClose={handleClose}
      />
    </>
  );
};

const Home: React.FC = () => {
  const fileInput = React.useRef<HTMLInputElement>();
  const fileReader = React.useRef<FileReader>(new FileReader());
  const [fileName, setFileName] = React.useState<string>("No file chosen.");
  const [reportQuery, setReportQuery] = React.useState<string>("");
  const [uploadedKeywords, setUploadedKeywords] = React.useState<string[]>([]);
  const [consoleLog, setConsoleLog] = React.useState<string>("");
  const [refetchInterval, setRefetchInterval] = React.useState<number | false>(
    false
  );

  // Access the client
  const queryClient = useQueryClient();

  const {
    isLoading,
    data,
    refetch: refetchReports,
  } = useQuery(
    [QUERY_KEYWORD_REPORTS, reportQuery],
    ({ queryKey }) => SearchAPI.getReports(queryKey[1]),
    {
      refetchInterval,
    }
  );

  const {
    isLoading: isUploadingKeywords,
    mutateAsync: uploadKeywordForGoogleSearch,
  } = useMutation(SearchAPI.searchGoogle, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(QUERY_KEYWORD_REPORTS);
      setFileName("No file chosen.");
      setUploadedKeywords([]);
    },
    onSettled() {
      setRefetchInterval(false);
      showProcessingLog(false);
    },
  });

  function showProcessingLog(isShow: boolean) {
    return isShow ? setConsoleLog("Proccessing....") : setConsoleLog("");
  }

  return (
    <div className="container pt-2">
      <div className="keyword-action-panel">
        <InputGroup className="keyword-action-panel__input">
          <InputGroup.Text className="bg-white">
            <Search size={16} />
          </InputGroup.Text>
          <Form.Control
            aria-label="Search for keyword reports"
            aria-placeholder="Search for keyword reports"
            placeholder="Search for keyword reports"
            disabled={isUploadingKeywords}
            value={reportQuery}
            onChange={(e) => setReportQuery(e.target.value)} // NOTE: should debounced
          />
        </InputGroup>

        <Button
          type="button"
          variant="primary"
          disabled={isUploadingKeywords}
          onClick={() => {
            fileInput.current?.click();
          }}
        >
          Import .csv&nbsp;
          <FileImport size={20} />
        </Button>
        <InputGroup className="keyword-action-panel__input">
          <Form.Control
            className="keyword-file-upload__name"
            readOnly
            value={fileName}
          />
          <Button
            type="button"
            variant="success"
            disabled={isUploadingKeywords || !uploadedKeywords.length}
            onClick={async () => {
              showProcessingLog(true);
              setRefetchInterval(3000);
              await uploadKeywordForGoogleSearch(uploadedKeywords);
              refetchReports();
            }}
          >
            <CloudUpload size={20} strokeWidth={2} />
          </Button>
        </InputGroup>

        <Form.Control
          type="file"
          accept=".csv"
          className="d-none"
          ref={(el: HTMLInputElement) => {
            fileInput.current = el;
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setFileName(file.name);
            function onload(event: any) {
              const data = event.target?.result;
              if (data && typeof data === "string") {
                setUploadedKeywords(data.split(",") ?? []);
              }
              e.target.value = null as any;
            }
            fileReader.current.onload = onload;
            fileReader.current?.readAsText?.(file);
          }}
        />
      </div>
      {consoleLog ? <Alert variant="warning">{consoleLog}</Alert> : null}
      <KeywordReportTable isLoading={isLoading} data={data ?? []} />
    </div>
  );
};

export default Home;
