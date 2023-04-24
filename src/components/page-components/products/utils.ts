export const createableSelectStyles: any = {
  control: (baseStyles: any) => ({
    ...baseStyles,
    minHeight: '48px',
  }),
  valueContainer: (baseStyles: any) => ({
    ...baseStyles,
    paddingTop: '8px',
  }),
  input: (baseStyles: any) => ({
    ...baseStyles,
  }),
  placeholder: () => ({
    position: 'absolute',
    top: 0,
    left: '8px',
    fontSize: '12px',
    fontWeight: 300,
    transform: 'translate(16px, -8px)',
    background: '#ffffff',
  }),
  menu: (baseStyles: any) => ({
    ...baseStyles,
    zIndex: 3
  })
}
