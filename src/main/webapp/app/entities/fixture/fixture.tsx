import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter, textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './fixture.reducer';
import { AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { IFixture } from 'app/shared/model/fixture.model';

export interface IFixtureProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Fixture extends React.Component<IFixtureProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { fixtureList, match, isAdmin } = this.props;
    const homeTeamOptions = {};
    const awayTeamOptions = {};
    new Set(fixtureList.map(fixture => fixture.homeTeam.name)).forEach(ele => {
      homeTeamOptions[ele] = ele;
    });

    new Set(fixtureList.map(fixture => fixture.awayTeam.name)).forEach(ele => {
      awayTeamOptions[ele] = ele;
    });

    const columns : any = [
      {
        dataField: 'eventDate',
        text: 'Event Date',
        filter: textFilter()
      },
      {
        dataField: 'round',
        text: 'Round'
      },
      {
        dataField: 'homeTeam',
        text: 'Home Team',
        filter: selectFilter({
          options: homeTeamOptions,
          onFilter: (filterValue: string) =>
            filterValue === '' ? fixtureList : fixtureList.filter(ele => ele.homeTeam.name === filterValue)
        }),
        formatter: (cellContent, fixture: IFixture) => fixture.homeTeam.name
      },
      {
        dataField: 'score',
        text: 'Score'
      },
      {
        dataField: 'awayTeam',
        text: 'Away Team',
        filter: selectFilter({
          options: awayTeamOptions,
          onFilter: (filterValue: string) =>
            filterValue === '' ? fixtureList : fixtureList.filter(ele => ele.awayTeam.name === filterValue)
        }),
        formatter: (cellContent, fixture: IFixture) => fixture.awayTeam.name
      }
    ];

    const commandColumn = {
      dataField: 'commandColumn',
      isDummyField: true,
      text: '',
      formatter: (cellContent, fixture) => (
        <div className="btn-group flex-btn-group-container">
          <Button tag={Link} to={`${match.url}/${fixture.id}`} color="info" size="sm">
            <FontAwesomeIcon icon="eye" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.view">View</Translate>
            </span>
          </Button>
          <Button tag={Link} to={`${match.url}/${fixture.id}/edit`} color="primary" size="sm">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
          <Button tag={Link} to={`${match.url}/${fixture.id}/delete`} color="danger" size="sm">
            <FontAwesomeIcon icon="trash" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.delete">Delete</Translate>
            </span>
          </Button>
        </div>
      )
    };

    if (isAdmin) {
      columns.push(commandColumn);
    }

    return (
      <div>
        <h2 id="fixture-heading">
          <Translate contentKey="footballUiApp.fixture.home.title">Fixtures</Translate>
        </h2>
        <div className="table-responsive">
          {fixtureList && fixtureList.length > 0 ? (
            <BootstrapTable keyField="id" data={fixtureList} columns={columns} filter={filterFactory()} pagination={paginationFactory()} />
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="footballUiApp.fixture.home.notFound">No Fixtures found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ fixture, authentication }: IRootState) => ({
  fixtureList: fixture.entities,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fixture);
