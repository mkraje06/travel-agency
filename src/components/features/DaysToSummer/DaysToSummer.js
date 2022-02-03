import React from "react";
import styles from "./DaysToSummer.scss";
import PropTypes from "prop-types";

class DaysToSummer extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  static defaultProps = {
    title: " ",
  };

  getCountdownDay() {
    const currentDay = new Date();
    const summerStart = new Date(currentDay.getFullYear(), 5, 21);
    const summerEnd = new Date(currentDay.getFullYear(), 8, 23);
    const msPerDay = 24 * 60 * 60 * 1000;

    if (
      (currentDay.getDate() > 23 && currentDay.getMonth() === 8) ||
      currentDay.getMonth() > 8
    ) {
      summerStart.setFullYear(currentDay.getFullYear() + 1);
      summerEnd.setFullYear(currentDay.getFullYear() + 1);
    }

    if (
      (currentDay.getMonth() > summerStart.getMonth() &&
        currentDay.getMonth() < summerEnd.getMonth()) ||
      (currentDay.getMonth() === 5 &&
        currentDay.getDate() >= summerStart.getDate()) ||
      (currentDay.getMonth() === 8 &&
        currentDay.getDate() <= summerEnd.getDate())
    ) {
      return this.props.title;
    }

    console.log(summerStart, currentDay);
    const timeLeft = summerStart.getTime() - currentDay.getTime();
    const e_daysLeft = timeLeft / msPerDay;
    let daysLeft = Math.floor(e_daysLeft);

    if (daysLeft == 1) {
      return daysLeft + " day to summer!";
    } else {
      return daysLeft + " days to summer!";
    }
  }

  render() {
    const days = this.getCountdownDay();
    return (
      <div className={styles.component}>
        <h3 className={styles.summerDays}>{days}</h3>
      </div>
    );
  }
}
export default DaysToSummer;
