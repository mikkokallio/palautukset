import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: "New stuff, incredible!";
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const Header: React.FC<{ name: string }> = ({ name }) => (
  <h1>{name}</h1>
)

const Part: React.FC<{ part: any }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (<p>{part.name} {part.exerciseCount} {part.description}</p>);
    case "Using props to pass data":
      return (<p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>);
    case "Deeper type usage":
      return (<p>{part.name} {part.exerciseCount} {part.groupProjectCount} {part.exerciseSubmissionLink}</p>);
    case "New stuff, incredible!":
      return (<p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>);
    default:
      return null;
  }
}

const Content: React.FC<{ parts: any }> = ({ parts }) => (
  <div>
    {Object.values(parts).map((part: any) => <Part part={part}></Part>)}
  </div>
)

const Total: React.FC<{ parts: any }> = ({ parts }) => (
  <p>
    Number of exercises{" "}
    {parts.reduce((carry: number, part: any) => carry + part.exerciseCount, 0)}
  </p>
)

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "New stuff, incredible!",
      exerciseCount: 3,
      description: "Fake description"
    }
  ];


  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById("root"));