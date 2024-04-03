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

  type SocialMedias = components['schemas']['SocialMedia']
  type FormFields = Record<SocialMedias, string>

  const { register, handleSubmit, reset, formState } = useForm<FormFields>({
    mode: 'onChange',
    defaultValues: {
      Facebook: user?.social?.find((social) => social.name === 'Facebook')?.url || '',
      Github: user?.social?.find((social) => social.name === 'Github')?.url || '',
      Linkedin: user?.social?.find((social) => social.name === 'Linkedin')?.url || '',
      Twitter: user?.social?.find((social) => social.name === 'Twitter')?.url || '',
      Instagram: user?.social?.find((social) => social.name === 'Instagram')?.url || '',
    },
  })

  const didChange = formState.isDirty

  const handleSave = async (data: FormFields): Promise<void> => {
    const social = Object.entries(data).map(([name, value]) => ({
      name,
      url: value,
    }))
    onUpdateUser({ data: { social } as Partial<UpdateUserInputDto> })
  }

  return (
    <Grid sx={{ my: 1, pb: 2 }} container spacing={2}>
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
                defaultValue={user?.social?.find((social) => social.name === name)?.url || ''}
                InputProps={{
                  startAdornment: <InputAdornment position="start">{<Icon />}</InputAdornment>,
                }}
                {...register(name)}
              />
            ))}
            {didChange ? (
              <Stack spacing={2} direction={'row'} justifyContent={'flex-end'}>
                <LoadingButton loading={loading} size="small" variant="contained" type="submit">
                  Save
                </LoadingButton>
                <LoadingButton loading={loading} size="small" variant="outlined" onClick={(): void => reset()}>
                  Cancel
                </LoadingButton>
              </Stack>
            ) : null}
          </Stack>
        </form>
      </Grid>
    </Grid>
  )
}
