import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import Sidebar from "../Components/Sidebar";
import Form from "react-bootstrap/Form";
import "./Home.css";
import Spinner from "react-bootstrap/Spinner";
export default function Home() {
  const [fetchData, setFetchData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showData, setShowData] = useState({
    home_team: { team: fetchData.home_team },
  });
  const [page, setPage] = useState(1);

  function sidebarData(id) {
    const showData = fetchData.find((data) => data.id === id);
    setShowData(showData);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchProducts = async () => {
    setShowSpinner(true);
    try {
      const res = await axios.get(
        `https://www.balldontlie.io/api/v1/games?_limit=30`
      );
      const data = await res.data;

      if (data && data.data) {
        setFetchData(data.data);
      }
      setShowSpinner(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= fetchData.length / 5 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <Container>
      <div style={{ margin: "1rem" }}>
        <p
          style={{
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "56px",
            color: "#074684",
            textAlign: "left",
          }}
        >
          NBA TEAMS
        </p>

        <Form.Control
          size="lg"
          type="text"
          style={{
            border: "2px solid #074684",
            borderRadius: "10px",
            marginBottom: "1rem",
            width: "50%",
          }}
        />

        <Table striped bordered hover>
          {showSpinner && <Spinner animation="border" variant="primary" />}

          <thead
            style={{
              background: "#074684",
              borderRadius: "5px",
            }}
          >
            <tr
              style={{
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "56px",
                color: "#FFFFFF",
              }}
            >
              <th>TEAM NAME</th>
              <th>CITY</th>
              <th>Abbreviation</th>
              <th>Conference</th>
              <th>Division</th>
            </tr>
          </thead>
          {fetchData.length > 0 ? (
            fetchData.slice(page * 5 - 5, page * 5).map((data) => (
              <tbody onClick={handleShow} key={data.id}>
                <tr
                  onClick={() => sidebarData(data.id)}
                  style={{
                    background: "#F8FBFD",
                    borderRadius: "5px",
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: "56px",
                    color: "#000000",
                  }}
                >
                  <td> {data.home_team.name}</td>
                  <td>{data.home_team.city}</td>
                  <td>{data.home_team.abbreviation}</td>
                  <td>{data.home_team.conference}</td>
                  <td>{data.home_team.division}</td>
                </tr>
              </tbody>
            ))
          ) : (
            <p>Not Found</p>
          )}
        </Table>
        {fetchData.length > 0 && (
          <div className="pagination">
            <span
              onClick={() => selectPageHandler(page - 1)}
              className={page > 1 ? "" : "pagination__disable"}
            >
              ◀
            </span>

            {[...Array(fetchData.length / 5)].map((_, i) => {
              return (
                <span
                  key={i}
                  className={page === i + 1 ? "pagination__selected" : ""}
                  onClick={() => selectPageHandler(i + 1)}
                >
                  {i + 1}
                </span>
              );
            })}

            <span
              onClick={() => selectPageHandler(page + 1)}
              className={
                page < fetchData.length / 5 ? "" : "pagination__disable"
              }
            >
              ▶
            </span>
          </div>
        )}
      </div>

      <Sidebar show={show} handleClose={handleClose} showData={showData} />
    </Container>
  );
}
