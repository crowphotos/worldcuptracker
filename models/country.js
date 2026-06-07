const VALID_CONFEDERATIONS = new Set(['UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC']);

export default class Country {
  constructor(id, name, { code, group, confederation } = {}) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new TypeError('Country id must be a positive integer');
    }
    if (typeof name !== 'string' || !name.trim()) {
      throw new TypeError('Country name must be a non-empty string');
    }
    if (code !== undefined && (typeof code !== 'string' || !/^[A-Z]{3}$/.test(code))) {
      throw new TypeError('Country code must be a 3-letter uppercase string (e.g. "USA")');
    }
    if (confederation !== undefined && !VALID_CONFEDERATIONS.has(confederation)) {
      throw new TypeError(`Country confederation must be one of: ${[...VALID_CONFEDERATIONS].join(', ')}`);
    }

    this.id = id;
    this.name = name.trim();
    this.code = code ?? null;
    this.group = group ?? null;
    this.confederation = confederation ?? null;

    Object.freeze(this);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      group: this.group,
      confederation: this.confederation,
    };
  }

  static fromJSON({ id, name, code, group, confederation }) {
    return new Country(id, name, { code, group, confederation });
  }
}
