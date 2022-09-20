import React from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { IKeywordReport } from "ui/shared/type";
import { Search, FileSpreadsheet } from "tabler-icons-react";
import { MOCK_KEYWORD_RESOURCES } from "../../mock/keywords";
import "./Home.scss";

interface IKeywordReportTableProps {
  data: IKeywordReport[];
}

function renderRow(item: IKeywordReport): JSX.Element {
  return (
    <tr key={item.id} className="keyword-table__row">
      <th>
        <Form.Check type="checkbox" />
      </th>
      <td>{item.keyword}</td>
      <td>
        {item.totalResults} | {item.totalSearchTime} | {item.totalLinks}
      </td>
      <td>{item.status}</td>
    </tr>
  );
}

const KeywordReportTable: React.FC<IKeywordReportTableProps> = (props) => {
  const { data } = props;
  return (
    <Table hover bordered>
      <thead>
        <tr>
          <th className="keyword-table__functional-col">
            <Form.Check type="checkbox" />
          </th>
          <th>Keyword</th>
          <th>Stat</th>
          <th className="keyword-table__functional-col">Status</th>
        </tr>
      </thead>
      <tbody>{data.map((row) => renderRow(row))}</tbody>
    </Table>
  );
};

const Home: React.FC = () => {
  return (
    <div className="container pt-2">
      <div className="keyword-action-panel">
        <InputGroup className="keyword-action-panel__input">
          <InputGroup.Text className="bg-white">
            <Search size={16} strokeWidth={2} />
          </InputGroup.Text>
          <Form.Control
            aria-label="Search for keyword reports"
            aria-placeholder="Search for keyword reports"
            placeholder="Search for keyword reports"
          />
        </InputGroup>
        <Button variant="secondary" className="keyword-file-upload-button">
          <div className="keyword-file-upload-button__inner">
            <span className="keyword-file-upload-button__label">
              Upload .csv file
            </span>
            <FileSpreadsheet
              className="keyword-file-upload-button__icon"
              size={24}
              strokeWidth={1}
              color="white"
            />
          </div>
        </Button>
      </div>
      <KeywordReportTable data={MOCK_KEYWORD_RESOURCES} />
    </div>
  );
};

export default Home;
