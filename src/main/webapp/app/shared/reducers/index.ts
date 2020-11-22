import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import player, {
  PlayerState
} from 'app/entities/player/player.reducer';
// prettier-ignore
import team, {
  TeamState
} from 'app/entities/team/team.reducer';
// prettier-ignore
import fixture, {
  FixtureState
} from 'app/entities/fixture/fixture.reducer';
// prettier-ignore
import foiFootballPlayer, {
  FoiFootballPlayerState
} from 'app/entities/foi-football-player/foi-football-player.reducer';
// prettier-ignore
import foiFootballPosition, {
  FoiFootballPositionState
} from 'app/entities/foi-football-position/foi-football-position.reducer';
// prettier-ignore
import foiFootballTeam, {
  FoiFootballTeamState
} from 'app/entities/foi-football-team/foi-football-team.reducer';
// prettier-ignore
import foiFootballFixture, {
  FoiFootballFixtureState
} from 'app/entities/foi-football-fixture/foi-football-fixture.reducer';
// prettier-ignore
import foiFootballTournament, {
  FoiFootballTournamentState
} from 'app/entities/foi-football-tournament/foi-football-tournament.reducer';
// prettier-ignore
import standing, {
  StandingState
} from 'app/entities/standing/standing.reducer';
// prettier-ignore
import competition, {
  CompetitionState
} from 'app/entities/competition/competition.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly player: PlayerState;
  readonly team: TeamState;
  readonly fixture: FixtureState;
  readonly foiFootballPlayer: FoiFootballPlayerState;
  readonly foiFootballPosition: FoiFootballPositionState;
  readonly foiFootballTeam: FoiFootballTeamState;
  readonly foiFootballFixture: FoiFootballFixtureState;
  readonly foiFootballTournament: FoiFootballTournamentState;
  readonly standing: StandingState;
  readonly competition: CompetitionState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  player,
  team,
  fixture,
  foiFootballPlayer,
  foiFootballPosition,
  foiFootballTeam,
  foiFootballFixture,
  foiFootballTournament,
  standing,
  competition,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
