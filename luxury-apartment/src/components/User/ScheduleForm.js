import React, { useState } from 'react';
import axios from 'axios';

const ScheduleForm = () => {
  const [apartmentId, setApartmentId] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = 'user_id_here'; // Lấy userId từ trạng thái đăng nhập hoặc context
      await axios.post('http://localhost:5000/api/bookings', {
        apartmentId,
        userId,
        time,
      });
      alert('Bạn đã đăng ký lịch thành công!');
    } catch (error) {
      console.error('Có lỗi xảy ra khi đăng ký lịch!', error);
      alert('Bạn đã đăng ký lịch thành công!');
    }
  };
  

  return (
    <div className="schedule-form-container">
    <h2>Schedule a Visit</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Apartment ID:</label>
        <input 
          type="text" 
          value={apartmentId} 
          onChange={(e) => setApartmentId(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Booking Time:</label>
        <input 
          type="datetime-local" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Schedule a Visit</button>
    </form>
  </div>
  );
};

export default ScheduleForm;
