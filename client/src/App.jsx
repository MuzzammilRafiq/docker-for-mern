import { useEffect, useState } from "react";
import axios from "axios";
const baseurl = process.env.BASE_URL;
function App() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState("");
  const [reload, setReload] = useState(Date.now());
  const [edit, setEdit] = useState(false);
  const [currentEdit, setCurrentEdit] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseurl}/task`, {
        task,
      });
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
    setTask("");
    setReload(Date.now());
  };
  const handleDelete = async (e) => {
    try {
      const res = await axios.delete(`${baseurl}/task/${e.target.value}`);
    } catch (error) {
      console.log(error);
    }
    setReload(Date.now());
  };

  const handleEdit = async (e) => {
    try {
      const res = await axios.delete(`${baseurl}/task/${e.target.value}`, {
        task: currentEdit,
      });
    } catch (error) {
      console.log(error);
    }
    setReload(Date.now());
    setEdit(false);
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${baseurl}/task`);
      setList(res.data.tasks);
    })();
  }, [reload]);
  return (
    <div
      style={{
        width: "50%",
        marginTop: "10px",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "whitesmoke",
        textAlign: "center",
        padding: "10px",
      }}
    >
      {list.map((ll, i) => (
        <li key={i} style={{ display: "flex" }}>
          {/* {edit ? (
            <>
              <input
                type="text"
                value={currentEdit}
                onChange={(e) => setCurrentEdit(e.target.value)}
              />
              <button onClick={handleEdit} value={ll._id}>
                Done
              </button>
            </>
          ) : ( */}
          <>
            <div>{ll.data}</div>

            <button
              style={{ cursor: "pointer" }}
              value={ll._id}
              onClick={handleDelete}
            >
              delete
            </button>
            {/* <button
              style={{ cursor: "pointer" }}
              value={ll._id}
              onClick={() => {
                setEdit(true);
                setCurrentEdit(ll.data);
              }}
            >
              edit
            </button> */}
          </>
          {/* )} */}
        </li>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter ur task"
          required
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input type="submit" value="submit" style={{ cursor: "pointer" }} />
      </form>
    </div>
  );
}

export default App;
