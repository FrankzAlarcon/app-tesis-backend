interface ProjectSkill {
  id: string
  name: string
}

export interface UserProject {
  id: string
  name: string
  description: string
  url: string
  studentId: string
  projectSkills: ProjectSkill[]

  createdAt: string
  updatedAt: string
}