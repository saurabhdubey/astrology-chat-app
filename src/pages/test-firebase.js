import { auth } from '../lib/firebase';  // One level up from pages/
export default function Test() {
  console.log("Firebase auth instance:", auth);
  return <h1>Check browser console (F12)</h1>;
}