import { GluegunCommand } from 'gluegun'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import { GluegunAskResponse } from 'gluegun/build/types/toolbox/prompt-types'
import { Framework } from '../types'

const reactStarter = async (toolbox: Toolbox, response: GluegunAskResponse) => {
  const {
    prompt: { ask },
    print,
  } = toolbox
  print.success('Selecionado React!\n')
  const result = await ask([
    {
      type: 'select',
      message: 'Wich language would you like to build in?',
      name: 'language',
      choices: [
        {
          name: 'ts',
          message: 'Typescript - .ts / .tsx',
          value: 'ts',
        },
        {
          message: 'JavaScript - .js / .jsx',
          name: 'js',
          value: 'js',
        },
      ],
    },
  ])
  return { ...result, ...response }
}

const command: GluegunCommand = {
  name: 'init',
  run: async (toolbox) => {
    const { print, prompt } = toolbox
    print.success('EMF - Starting new project...\n')
    const result = await prompt.ask([
      {
        type: 'input',
        message: 'Name of the project',
        name: 'projectName',
      },
      {
        type: 'select',
        message: 'Wich framework ?',
        name: 'framework',
        choices: [
          {
            name: Framework.REACT,
            message: 'ReactJS',
            value: Framework.REACT,
          },
          {
            name: Framework.VUE,
            message: 'Vue',
            value: Framework.VUE,
          },
        ],
      },
    ])
    const resultFramework = result.framework
    if (resultFramework === Framework.REACT) {
      const reactResult = await reactStarter(toolbox, result)
      print.debug(reactResult)
    }
  },
}

module.exports = command
