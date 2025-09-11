// components/MissingWorkAlert.jsx
export default function MissingWorkAlert({ missingAssignments }) {
  if (!missingAssignments || missingAssignments.length === 0) return null;
  
  return (
    <div className="alert-card warning">
      <h4>Missing Assignments</h4>
      <ul>
        {missingAssignments.map(assignment => (
          <li key={assignment.id}>
            {assignment.title} - {assignment.course}
          </li>
        ))}
      </ul>
    </div>
  );
}