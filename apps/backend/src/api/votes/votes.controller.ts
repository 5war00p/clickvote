import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { VotesService } from '@clickvote/backend/src/packages/votes/votes.service';
import { GetUserFromRequest } from '@clickvote/backend/src/helpers/user.from.request';
import { UserFromRequest } from '@clickvote/interfaces';
import { ValidateId, VotesValidation } from '@clickvote/validations';

@Controller('/votes')
export class VotesController {
  constructor(private _votesService: VotesService) {}

  @Get('/:id')
  async getVote(
    @GetUserFromRequest() user: UserFromRequest,
    @ValidateId('id') id: string
  ) {
    return this._votesService.getVote(user.currentOrg.id, id);
  }

  @Get('/')
  async getVotes(@GetUserFromRequest() user: UserFromRequest) {
    return {
      votes: await this._votesService.getAllVotesForOrg(
        user.currentEnv.id,
        user.currentOrg.id,
        1
      ),
    };
  }

  @Put('/:id')
  async updateVote(
    @GetUserFromRequest() user: UserFromRequest,
    @Body() body: VotesValidation,
    @ValidateId('id') id: string
  ) {
    return this._votesService.updateVote(
      user.currentEnv.id,
      id,
      user.currentOrg.id,
      body
    );
  }

  @Post('/')
  async createVote(
    @GetUserFromRequest() user: UserFromRequest,
    @Body() body: VotesValidation
  ) {
    return this._votesService.createVote(
      user.currentEnv.id,
      user.currentOrg.id,
      body
    );
  }
}
