import { Grid, InputAdornment, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { userStore } from '~/stores'
import { socialMediasList } from '~/constants'
import { UpdateUserInputDto, useOnUpdateUser } from '~/queries'
import { useForm } from 'react-hook-form'
import { components } from '~/types'
export const Social = (): JSX.Element => {
  const user = userStore((state) => state.user)
  const { onUpdateUser, loading } = useOnUpdateUser()

  type socialMedias = components['schemas']['SocialMedia']
  type FormFields = Record<socialMedias, string>

  const { register, handleSubmit, reset } = useForm<FormFields>({
    defaultValues: {
      Facebook: '',
      Github: '',
      Linkedin: '',
      Twitter: '',
      Instagram: '',
    },
  })

  const handleSave = async (data: FormFields): Promise<void> => {
    const social = Object.entries(data).map(([name, value]) => ({
      name,
      url: value,
    }))
    onUpdateUser({ data: { social } as Partial<UpdateUserInputDto> })
  }

  return (
    <Grid sx={{ my: 1 }} container spacing={2}>
      <Grid item xs={12} md={3}>
        Social
      </Grid>
      <Grid item xs={12} md={9}>
        <form onSubmit={handleSubmit(handleSave)}>
          <Stack spacing={2}>
            {socialMediasList.map(({ name, Icon }) => (
              <TextField
                key={name}
                label={name}
                value={user?.social?.find((social) => social.name === name)?.url}
                InputProps={{
                  startAdornment: <InputAdornment position="start">{<Icon />}</InputAdornment>,
                }}
                {...register(name)}
              />
            ))}
            <Stack spacing={2} direction={'row'} justifyContent={'flex-end'}>
              <LoadingButton loading={loading} size="small" variant="contained" type="submit">
                Save
              </LoadingButton>
              <LoadingButton loading={loading} size="small" variant="outlined" onClick={(): void => reset()}>
                Cancel
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </Grid>
    </Grid>
  )
}
