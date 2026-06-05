export default class Match {
  constructor(id, team1Id, team2Id, date, group, result) {
    this.id = id;
    this.team1Id = team1Id;
    this.team2Id = team2Id;
    this.date = date;
    this.group = group;
    this.result = result; // {team1Score: number, team2Score: number} or null
  }
}
