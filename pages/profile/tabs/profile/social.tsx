import { Box, Button, Grid, InputAdornment, TextField } from "@mui/material"
import { fetchApi } from "client"
import { useForm } from "react-hook-form"
import { SocialMediasListType, socialMediasList } from "src/constants"
import { useAuthStore } from "src/stores"

type SocialMedias = "linkedin" | "github" | "facebook" | "twitter"

type FormFields = {
  social: Partial<Record<SocialMedias, string>>
}

type GenericObj = Record<string, string>

export const Social = () => {
  const userData = useAuthStore((state: any) => state.user)
  const setUserStore = useAuthStore((state: any) => state.setUser)

  const { social } = userData
  const mediasNormalized = social.reduce((obj: GenericObj, item: GenericObj) => {
    obj[item.name] = item.url
    return obj
  }, {})

  const { register, handleSubmit, watch, setValue } = useForm<FormFields>({
    defaultValues: {
      social: {
        linkedin: mediasNormalized.linkedin,
        github: mediasNormalized.github,
        facebook: mediasNormalized.facebook,
        twitter: mediasNormalized.twitter,
      },
    },
  })
  const fieldWatch = watch()

  const handleChange = async (data: any) => {
    const requestData = {
      id: userData.id,
      username: userData.username,
      social: Object.entries(data.social).map(([name, url]) => ({ name, url })),
    }
    const { user: updatedUser, token } = await fetchApi({
      url: "/user",
      method: "PATCH",
      body: requestData,
    })
    setUserStore(updatedUser, token)
  }

  return (
    <form onSubmit={handleSubmit(handleChange)}>
      <Grid sx={{ my: 3 }} container spacing={0}>
        <Grid item xs={12} md={3}>
          Social
        </Grid>
        <Grid item xs={12} md={9}>
          {socialMediasList.map(({ name, Icon }: SocialMediasListType) => (
            <TextField
              margin="normal"
              key={name}
              label={name}
              fullWidth
              {...register(`social.${name}` as any)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon />
                  </InputAdornment>
                ),
              }}
            />
          ))}
          {JSON.stringify(fieldWatch.social) !== JSON.stringify(mediasNormalized) && (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="text" onClick={() => setValue("social", userData?.social)}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </form>
  )
}
