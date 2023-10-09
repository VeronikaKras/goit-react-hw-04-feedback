import { useState, useEffect } from 'react';

import Statistics from 'components/Statistics/Statistics';
import Notification from 'components/NoFeedback/Notification';
import Button from 'components/Buttons/Buttons';

export function Feedback() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);

  const onButtonClick = index => {
    switch (index) {
      case 'good':
        setGood(good + 1);
        break;

      case 'neutral':
        setNeutral(neutral + 1);
        break;

      case 'bad':
        setBad(bad + 1);
        break;

      default:
        return;
    }
  };

  useEffect(() => {
    const countTotalFeedback = good + neutral + bad;
    setTotalFeedback(countTotalFeedback);
  }, [good, neutral, bad]);

  const options = ['good', 'neutral', 'bad'];

  const countPositiveFeedbackPercentage = () => {
    if (totalFeedback === 0) {
      return 0;
    }

    const percentage = (good / totalFeedback) * 100;
    return Math.round(percentage);
  };

  return (
    <>
      <h1> Please leave feedback</h1>
      <Button options={options} onLeaveFeedback={onButtonClick} />

      {totalFeedback > 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={totalFeedback}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}
