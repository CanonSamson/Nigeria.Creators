export const creatorsRequiredFields = {
  users: {
    name: true,
    email: true,
    profilePictureUrl: true,
    resident: true
  },
  creator_profile: {
    description: true,
    contentLink: true,
    categories: true,
    OR: [{ tiktokLink: true }, { instagramLink: true }]
  }
}
