import React from "react";
import styles from "./DaysToSummer.scss";
import PropTypes from "prop-types";

class DaysToSummer extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    title: PropTypes.string,
  };

  static defaultProps = {
    title: " ",
  };

  render() {
    const days = this.getCountdownDay();
    return (
      <div className={styles.component}>
        <h3 className={styles.summerDays}>
          {days}
          {this.props.title}
        </h3>
      </div>
    );
  }

  getCountdownDay() {
    const currentDay = new Date();
    const summerDay = new Date("July 21, 2022");
    const msPerDay = 24 * 60 * 60 * 1000;
    const timeLeft = summerDay.getTime() - currentDay.getTime();
    const e_daysLeft = timeLeft / msPerDay;
    let daysLeft = Math.floor(e_daysLeft);
    console.log(currentDay);
    if (daysLeft > 365) {
      daysLeft = daysLeft % 365;
      return daysLeft + " days to summer!";
    } else if (daysLeft == 1) {
      return daysLeft + " day to summer!";
    } else {
      return daysLeft + " days to summer!";
    }
  }
}
export default DaysToSummer;
