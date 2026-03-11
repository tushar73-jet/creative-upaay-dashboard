import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import Column from "../components/Column"

function Dashboard() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      <Sidebar />

      <div style={{ flex: 1, padding: "20px", background: "#f5f5f5" }}>
        
        <Topbar />

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px"
          }}
        >
          <Column title="To Do" />
          <Column title="In Progress" />
          <Column title="Done" />
        </div>

      </div>
    </div>
  );
}

export default Dashboard