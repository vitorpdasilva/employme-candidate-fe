import { Box, Button, Grid, InputAdornment, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { Icon, SemanticICONS } from "semantic-ui-react"
import { useAuthStore } from "src/stores"

type SocialProps = {
  name: SemanticICONS;
  url: string;
};

type SocialMedias = "linkedin" | "github" | "facebook" | "twitter";

type FormFields = {
  social: Partial<Record<SocialMedias, string>>;
};

type GenericObj = Record<string, string>;

export const Social = () => {
  const userData = useAuthStore((state: any) => state.user)
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

  const handleChange = () => {
    handleSubmit((data) => {
      console.log(data)
    })
  }

  console.log({ fieldWatch, userData })

  return (
    <Grid sx={{ my: 3 }} container spacing={0}>
      <Grid item xs={12} md={3}>
        Social
      </Grid>
      <Grid item xs={12} md={9}>
        {social.map(({ name }: SocialProps) => (
          <TextField
            margin="normal"
            key={name}
            label={name}
            fullWidth
            {...register(`social.${name}` as any)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon name={name} />
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
            <Button variant="contained" onClick={handleChange}>
              Save
            </Button>
          </Box>
        )}
      </Grid>
    </Grid>
  )
}
