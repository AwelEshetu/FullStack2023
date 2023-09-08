import Content from "./Content"
import Header from "./Header"
import Sum from "./Sum"

const Course = ({courses} ) => {
    return (
        courses.map(course => 
            <div key={course.id}>
                <Header title={course.name} />
                <Content parts={course.parts} />
                <Sum total={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
            </div>
        ) 
    )
}

export default Course