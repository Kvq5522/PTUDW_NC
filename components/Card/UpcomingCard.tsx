import Link from "next/link";

const UpcomingCard = () => {
  return (
    <div className="upcoming-card shadow-lg">
      <div className="wrapper">
        <h2 className="upcoming-title">Upcoming</h2>
        <div className="upcoming-content">
          <div className="upC-main">
            <span className="upcoming-student">Nothing here yet. WooHoo !!!</span>
            <span className="upcoming-teacher" hidden>Make them suffer !!!</span>
          </div>
          <div className="vwAllUpC"><Link className="link-todo" href="/dashboard">View All</Link></div>
        </div>
        
      </div>
    </div>
  );
}

export default UpcomingCard;