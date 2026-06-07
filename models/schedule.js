export default class Schedule {
  constructor(id, matchId, day, { venue, city } = {}) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new TypeError('Schedule id must be a positive integer');
    }
    if (!Number.isInteger(matchId) || matchId <= 0) {
      throw new TypeError('Schedule matchId must be a positive integer');
    }
    const parsedDay = new Date(day);
    if (isNaN(parsedDay.getTime())) {
      throw new TypeError('Schedule day must be a valid date string or Date');
    }
    if (venue !== undefined && (typeof venue !== 'string' || !venue.trim())) {
      throw new TypeError('Schedule venue must be a non-empty string');
    }
    if (city !== undefined && (typeof city !== 'string' || !city.trim())) {
      throw new TypeError('Schedule city must be a non-empty string');
    }

    this.id = id;
    this.matchId = matchId;
    this.day = parsedDay;
    this.venue = venue ? venue.trim() : null;
    this.city = city ? city.trim() : null;

    Object.freeze(this);
  }

  toJSON() {
    return {
      id: this.id,
      matchId: this.matchId,
      day: this.day.toISOString(),
      venue: this.venue,
      city: this.city,
    };
  }

  static fromJSON({ id, matchId, day, venue, city }) {
    return new Schedule(id, matchId, day, { venue, city });
  }
}
