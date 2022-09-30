type Commands = { [key: string]: boolean };

/**
 * Run once service
 * Singleton
 */
class RunOnceService {
  /**
   * @private
   */
  private commands: Commands = {};

  /**
   * Get commands
   */
  public getCommands(): Commands {
    return this.commands;
  }

  /**
   * Run command
   */
  public runOnce(commandId: string, command: () => void): RunOnceService {
    if (!this.commands[commandId]) {
      this.commands[commandId] = true;
      command();
    }

    return this;
  }

  /**
   * Delete command from memory
   */
  public clearCommand(commandId: string): RunOnceService {
    if (this.commands[commandId]) {
      delete this.commands[commandId];
    }

    return this;
  }
}

export default new RunOnceService();
