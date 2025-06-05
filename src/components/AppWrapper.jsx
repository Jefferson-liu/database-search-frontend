// AppWrapper.jsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppWrapper({ children }) {
  return (
    <>
      <ToastContainer position="top-right" autoClose={500} theme="dark" />
      {children}
    </>
  );
}
