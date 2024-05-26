
export const Login = () => {
  return (
    <>
        <div className="login-title"></div>
        <div className="login-box">
            <form className="login-form card">
                <div className="textbox">
                <input type="text" placeholder="Username" name="username" />
                </div>
                <div className="textbox">
                <input type="password" placeholder="Password" name="password" />
                </div>
                <input type="submit" className="btn" value="Login" />
            </form>
        </div>
    </>
  )
}
