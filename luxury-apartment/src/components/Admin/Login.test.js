// LoginForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './Login';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
test('calls onLogin with the username and password when submitted', () => {
    const mockOnLogin = jest.fn();

    render(
        <MemoryRouter> {/* Bọc thành phần trong MemoryRouter */}
            <LoginForm onLogin={mockOnLogin} />
        </MemoryRouter>
    );

    // Nhập tên đăng nhập
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@gmail.com' } });

    // Nhập mật khẩu
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

    // Nhấn nút đăng nhập
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Kiểm tra xem hàm onLogin có được gọi với đúng tham số không
    expect(mockOnLogin).toHaveBeenCalledWith({ email: 'test@gmail.com', password: 'password' });

    // Kiểm tra xem hàm onLogin chỉ được gọi một lần
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
});