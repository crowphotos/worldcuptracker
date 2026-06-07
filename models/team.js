export default class Team {
  constructor(id, name, countryId, { group, coach } = {}) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new TypeError('Team id must be a positive integer');
    }
    if (typeof name !== 'string' || !name.trim()) {
      throw new TypeError('Team name must be a non-empty string');
    }
    if (!Number.isInteger(countryId) || countryId <= 0) {
      throw new TypeError('Team countryId must be a positive integer');
    }
    if (coach !== undefined && (typeof coach !== 'string' || !coach.trim())) {
      throw new TypeError('Team coach must be a non-empty string');
    }

    this.id = id;
    this.name = name.trim();
    this.countryId = countryId;
    this.group = group ?? null;
    this.coach = coach ? coach.trim() : null;

    Object.freeze(this);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      countryId: this.countryId,
      group: this.group,
      coach: this.coach,
    };
  }

  static fromJSON({ id, name, countryId, group, coach }) {
    return new Team(id, name, countryId, { group, coach });
  }
}
