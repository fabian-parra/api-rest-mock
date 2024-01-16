export const showHelp = () => {
  console.log(`Usage: api-mock [options]

Options:
  -h\t\tShow this help
  -c\t\tJSON config file path. By default api-config.json
  -p\t\tPort for stubs server. By deault 8883
  -l\t\tHostname for stubs server. By default 0.0.0.0
`)
}
