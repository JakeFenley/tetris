import React, { Component } from "react";
import getScores from "../../api-calls/requests/getScores";

export default class Leaderboard extends Component {
  state = {
    scores: [],
  };

  componentDidMount() {
    (async () => {
      const response = await getScores();
      this.setState({ scores: response });
    })();
  }

  render() {
    return (
      <section className="leaderboard">
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.scores.map((x, i) => (
              <tr key={i}>
                <td>#{i + 1}</td>
                <td>{x.owner_id}</td>
                <td>{x.score}</td>
                <td>{x.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}
