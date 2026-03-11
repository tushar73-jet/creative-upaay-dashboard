function Column({ title }) {
  return (
    <div
      style={{
        flex: 1,
        background: "#ffffff",
        padding: "15px",
        borderRadius: "10px",
        minHeight: "400px"
      }}
    >
      <h3>{title}</h3>
    </div>
  );
}

export default Column;