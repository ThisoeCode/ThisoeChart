import script from "@/script"

export default function Home() {
  return <p>{script('hans').indexPage.greeting}</p>
}