/* eslint-disable react/prop-types */
const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <strong>Number of exercises {sum}</strong>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        sum={course.parts.reduce((acc, part) => acc + part.exercises, 0)}
      />
    </div>
  );
};

export default Course;
