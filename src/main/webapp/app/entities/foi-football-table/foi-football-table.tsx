import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './foi-football-table.reducer';
import { IFoiFootballTable } from 'app/shared/model/foi-football-table.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFoiFootballTableProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FoiFootballTable extends React.Component<IFoiFootballTableProps> {

  componentDidMount() {
    this.props.getEntities(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.getEntities(this.props.match.params.id);
    }
  }

  render() {
    const { foiFootballTableList, match } = this.props;
    return (
      <div>
        <h2 id="foi-football-table-heading">
          <Translate contentKey="footballUiApp.foiFootballTable.home.title">Foi Football Tables</Translate>
        </h2>
        <div className="table-responsive">
          {foiFootballTableList && foiFootballTableList.length > 0 ? (
            <Table responsive aria-describedby="foi-football-table-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballTable.team">Team</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballTable.wins">Wins</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballTable.draws">Draws</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballTable.loses">Loses</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballTable.points">Points</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {foiFootballTableList.map((foiFootballTable, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{foiFootballTable.team}</td>
                    <td>{foiFootballTable.wins}</td>
                    <td>{foiFootballTable.draws}</td>
                    <td>{foiFootballTable.loses}</td>
                    <td>{foiFootballTable.points}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="footballUiApp.foiFootballTable.home.notFound">No Foi Football Tables found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ foiFootballTable }: IRootState) => ({
  foiFootballTableList: foiFootballTable.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoiFootballTable);
