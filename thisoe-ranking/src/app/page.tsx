import { redirect } from 'next/navigation'

export default function HomePage() {
  // The middleware will handle the redirection based on the user's language preference
  // This page acts as a fallback if middleware doesn't redirect
  redirect('/en')
}