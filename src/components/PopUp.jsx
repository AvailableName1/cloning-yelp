export default function PopUp(props) {
  return (
    <div className="card shadow-sm PopUp">
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.type}</h6>
        <p className="card-text">{props.text}</p>
      </div>
    </div>
  );
}
