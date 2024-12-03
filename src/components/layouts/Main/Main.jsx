import './Main.css'

const Main = ({ children }) => {
  return (
    <main className="main">
      <div className="main-content">
        {children}
      </div>
    </main>
  )
}

export default Main
