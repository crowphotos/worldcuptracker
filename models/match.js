function validateScore(result) {
  if (result === null || result === undefined) return null;
  if (typeof result !== 'object') throw new TypeError('Match result must be an object or null');
  const { team1Score, team2Score } = result;
  if (!Number.isInteger(team1Score) || team1Score < 0) {
    throw new TypeError('Match result.team1Score must be a non-negative integer');
  }
  if (!Number.isInteger(team2Score) || team2Score < 0) {
    throw new TypeError('Match result.team2Score must be a non-negative integer');
  }
  return Object.freeze({ team1Score, team2Score });
}

export default class Match {
  constructor(id, team1Id, team2Id, date, group, result) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new TypeError('Match id must be a positive integer');
    }
    if (!Number.isInteger(team1Id) || team1Id <= 0) {
      throw new TypeError('Match team1Id must be a positive integer');
    }
    if (!Number.isInteger(team2Id) || team2Id <= 0) {
      throw new TypeError('Match team2Id must be a positive integer');
    }
    if (team1Id === team2Id) {
      throw new TypeError('Match team1Id and team2Id must differ');
    }
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new TypeError('Match date must be a valid date string or Date');
    }
    if (typeof group !== 'string' || !group.trim()) {
      throw new TypeError('Match group must be a non-empty string');
    }

    this.id = id;
    this.team1Id = team1Id;
    this.team2Id = team2Id;
    this.date = parsedDate;
    this.group = group.trim();
    this.result = validateScore(result);

    Object.freeze(this);
  }

  get isCompleted() {
    return this.result !== null;
  }

  toJSON() {
    return {
      id: this.id,
      team1Id: this.team1Id,
      team2Id: this.team2Id,
      date: this.date.toISOString(),
      group: this.group,
      result: this.result,
    };
  }

  static fromJSON({ id, team1Id, team2Id, date, group, result }) {
    return new Match(id, team1Id, team2Id, date, group, result ?? null);
  }
}
