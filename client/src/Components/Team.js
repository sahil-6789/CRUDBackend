import React from 'react'
import styles from './Team.module.css'; 

const Team = ({team}) => {
  return (
    <div className={styles.Team}>
    <p> {team.teamName}</p>
    <p> {team.description}</p>
    <p>Members:</p>
      <ul>
        {team.member.map((member) => (
          <li key={member.id}>{`Name: ${member.first_name} ${member.last_name}, ID:${member.id}, Domain:${member.domain}`}</li>
        ))}
      </ul>
  </div>
  )
}

export default Team