import script from "@/script"

export default function Home() {
  return<main>
    <p>{script('hans').indexPage.greeting}</p>
  </main>
}