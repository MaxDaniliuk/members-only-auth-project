export default function getBaseURL() {
  return import.meta.env.MODE === 'development'
    ? ''
    : import.meta.env.VITE_API_URL;
}
