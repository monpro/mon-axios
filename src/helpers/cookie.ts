const cookie = {
  read(name: string): string | null {
    const regex = '(^|;\\s*)(' + name + ')=([^;]*)'
    const match = document.cookie.match(new RegExp(regex))
    return match ? decodeURIComponent(match[3]) : null
  }
}
