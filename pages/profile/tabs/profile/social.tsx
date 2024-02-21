import { Box, Button, Grid, InputAdornment, TextField } from '@mui/material'
import { useFetchApi } from 'client'
import { useForm } from 'react-hook-form'
import { SocialMediasListType, socialMediasList } from '~/constants'
import { userStore } from '~/stores'

type SocialMedias = 'linkedin' | 'github' | 'facebook' | 'twitter'

type FormFields = {
  social: Partial<Record<SocialMedias, string>>
}

type GenericObj = Record<string, string>

export const Social = () => {
  const { fetchApi } = useFetchApi()
  const user = userStore((state: any) => state.user)
  const setUserStore = userStore((state: any) => state.setUser)

  const { social } = user
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
      id: user.id,
      username: user.username,
      social: Object.entries(data.social).map(([name, url]) => ({ name, url })),
    }
    const { user: updatedUser, token } = await fetchApi({
      url: '/user',
      method: 'PATCH',
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="text" onClick={() => setValue('social', user?.social)}>
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
