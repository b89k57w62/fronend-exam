import React, { useEffect, useState } from "react"
import { Profile as ProfileType } from "types/types"
import { fetchProfile } from "utils/api"

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const loadProfile = async () => {
    const data = await fetchProfile()
    setProfile(data)
  }

  useEffect(() => {
    loadProfile()
  }, [])

  if (!profile) {
    return <div style={{ padding: "20px" }}>no profile data</div>
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{profile.name}</h1>
      <p>{profile.email}</p>
    </div>
  )
}

export default Profile
