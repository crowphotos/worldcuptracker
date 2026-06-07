import Country from '../models/country';
import Team from '../models/team';
import Match from '../models/match';

export const countries = [
  new Country(1, 'USA', { code: 'USA', confederation: 'CONCACAF' }),
  new Country(2, 'Canada', { code: 'CAN', confederation: 'CONCACAF' }),
];

export const teams = [
  new Team(1, 'USA National Team', 1),
  new Team(2, 'Canada National Team', 2),
];

export const matches = [
  new Match(1, 1, 2, '2026-06-11T13:00:00Z', 'A', null),
];
