<script lang='ts'>
  import { mdiAlert, mdiCheckCircle, mdiCloseCircle, mdiInformation } from '@mdi/js'
  import Icon from '$lib/components/Icon.svelte'

  export let level: 'error' | 'success' | 'warning' | 'info'
  export let message: string

  let iconPath = ''
  switch (level) {
    case 'success':
      iconPath = mdiCheckCircle
      break
    case 'warning':
      iconPath = mdiAlert
      break
    case 'info':
      iconPath = mdiInformation
      break
    default:
      iconPath = mdiCloseCircle
      break
  }
</script>

<div>
  <div>
    <div class='alert shadow-lg'
         class:alert-success={level === 'success'}
         class:alert-error={level === 'error'}
         class:alert-info={level === 'info'}
         class:alert-warning={level === 'warning'}
    >
      <div class='flex gap-2'>
        <Icon clazz='w-6 h-6' path={iconPath} />
        <span>{message}</span>
      </div>
    </div>
  </div>
</div>
