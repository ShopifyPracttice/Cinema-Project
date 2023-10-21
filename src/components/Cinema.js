import { useState} from "react";
import data from "./data.json";
import styled from "styled-components";

const DrawerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: ${({ 'data-drawer': drawer }) => (drawer ? '0' : '-300px')};
  width: 300px;
  height: 100%;
  background-color: #fff;
  transition: left 0.3s ease-in-out;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const Cinema = () => {
    const [seats, setSeats] = useState(data);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [drawer, setDrawer] = useState(false)



    const toggleDrawer = (e) => {
        e.preventDefault()
        setDrawer(!drawer);
    };

      
    const handleSeatClick = (index) => {
        const updatedSeats = [...seats];
        const seat = updatedSeats[index];
        if (!seat.isBooked) {
            seat.isBooked = true;
            setSelectedSeats([...selectedSeats, index]);
        } else {
            seat.isBooked = false;
            setSelectedSeats(selectedSeats.filter((seatIndex) => seatIndex !== index));
        }

        console.log(seat);
        setSeats(updatedSeats);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const updatedSeats = [...seats];
        selectedSeats.forEach((index) => {
            const seat = updatedSeats[index];
            if (seat.isBooked) {
                seat.isBooked = false;
                seat.SeatSelected = true; 
            }
            console.log(seat);
        });

        setSeats(updatedSeats);
    };
    const getSelectedSeatNames = () => {
        const selectedSeatNames = selectedSeats.map((index) => seats[index].Name);
        return selectedSeatNames;
    };

    const removeClick = (e) => {
        e.preventDefault()
        const updatedSeats = [...seats];
        selectedSeats.forEach((index) => {
            const seat = updatedSeats[index];
            if (!seat.isBooked) {
                seat.isBooked = false; 
                seat.SeatSelected = false;
            }
            console.log(seat);
        });

        setSeats(updatedSeats);
        setSelectedSeats([])
    }

    return (
        <form >
            <FormHeader>
                <h1>Welcome to Sugarland Theaters</h1>
                <h3>Select Your Available Seats</h3>
                <div className="info">
                    <h4>Available Seats<p className="seat-available"> </p></h4>
                    <h4>Reserved Seats<p className="seat-not-available"> </p></h4>
                    <h4>Selected Seats <p className="seat-selected"> </p></h4>

                </div>

                <div>
                    <DrawerWrapper data-drawer={drawer} >
                    <i className="fa-solid fa-xmark" id="x-mark" onClick={() => setDrawer(false)}></i>
                    <div className="selected-seats-box">
                    <h4>Selected Seats:{selectedSeats.length}</h4>
                    <ul className="selected-seats">
                        {getSelectedSeatNames().map((seatName, index) => (
                            <li key={index} className="selected-seats-name">{seatName}</li>
                        ))}
                    </ul>
                    <button onClick={removeClick} className="remove-button">Remove Seats</button>
                </div>
                    </DrawerWrapper>
                </div>


            </FormHeader>
            <FormBody>
                {seats.map((e, i) => (
                    <div
                        key={i}
                        className={`seats ${e.isBooked ? 'selected' : e.SeatSelected ? 'notAvailable' : 'available'}`}
                        onClick={() => !e.SeatSelected && handleSeatClick(i)}
                    >
                        <p>{e.Name}</p>
                    </div>
                ))}
            </FormBody>
            <ButtonContainer>
            <button type="submit" className="Book-button" disabled={!selectedSeats} onClick={handleFormSubmit}>Book Selected Seats</button>
            <button className="Check-button" onClick={toggleDrawer}>Check Selected Seats</button>
            </ButtonContainer>
        </form>

    );
};

export default Cinema;

const FormHeader = styled.div`
    h1 {
        color: #333;
        font-weight: 700;
        text-align: center;
    }
    h3 {
        color: #555;
        font-weight: 700;
        text-align: center;
    }
    @media screen and (max-width: 1090px) {
        h1{
            font-size: 22px;
        }
        h3{
            font-size: 18px;
        }
    }
`;

const FormBody = styled.div`
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    gap: 15px;

    .seats {
        width: 50px;
        height: 50px;
        align-items: center;
        display: flex;
        justify-content: center;
        color: #eee;
        border-top-right-radius: 12px;
        background-color: rgb(3, 3, 82);
        border-top-left-radius: 12px;
        cursor: pointer;
    }

    .seats.selected {
        background-color: black;
        color: #eee;
    }
      .seats.available{
    background-color: rgb(3, 3, 82);

      }
    .seats.notAvailable {
        background-color: #eee;
        color: #999;
        cursor: not-allowed;
    }
    @media screen and (max-width: 1090px) {
        gap:0;
        .seats{
            width: 30px;
            height: 30px;
        }
    }
}`  
const ButtonContainer = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: auto auto;
  
`


